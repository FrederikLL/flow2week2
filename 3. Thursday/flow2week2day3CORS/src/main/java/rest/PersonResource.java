/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;

class Person {
    private String name;
    private String email;
    private int id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public Person(String name, String email, int id) {
        this.name = name;
        this.email = email;
        this.id = id;
    } 

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

@Provider
@PreMatching
class CorsResponseFilter implements ContainerResponseFilter {
  private final static Logger LOG = Logger.getLogger(CorsResponseFilter.class.getName());
  @Override
  public void filter( ContainerRequestContext requestCtx, ContainerResponseContext res )
    throws IOException {
    LOG.info( "Executing REST response filter" );
    res.getHeaders().add("Access-Control-Allow-Origin", "*" );
    res.getHeaders().add("Access-Control-Allow-Credentials", "true" );
    res.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT" );
    res.getHeaders().add("Access-Control-Allow-Headers", "Origin, Accept, Content-Type");
  }

}

/**
 * REST Web Service
 *
 * @author Bruger
 */
@Path("person")
public class PersonResource {

    private static Map<Integer,Person> persons = new HashMap();
    private static Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static int nextId = 3;
 
     public PersonResource(){
        if(persons.isEmpty()){
            persons.put(1, new Person("Kurt Wonnegut","a@b.dk", 1));
            persons.put(2, new Person("Hanne Wonnegut","h@b.dk", 2));
        }
    }

    /**
     * Retrieves representation of an instance of rest.PersonResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAll() {
        //TODO return proper representation object
        return gson.toJson(persons.values());
    }
    
    @GET
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String getPerson(@PathParam("id") int id) {
        Person p = persons.get(id);
        
        return gson.toJson(p);
    }

    /**
     * PUT method for updating or creating an instance of PersonResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public String editPerson(String personAsJson, @PathParam("id") int id) {
       Person pOriginal = persons.get(id);
       Person personNew = gson.fromJson(personAsJson, Person.class);
       pOriginal.setName(personNew.getName());
       pOriginal.setName(personNew.getEmail());
       return gson.toJson(pOriginal);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String addPerson(String personAsJson) {
        Person personNew = gson.fromJson(personAsJson, Person.class);
        persons.put(nextId, personNew);
        personNew.setId(nextId);
        nextId++;
        return gson.toJson(personNew);
    }
    
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public String delete(@PathParam("id") int id){
        persons.remove(id);
        return "{}";
//        return "{\"status\"}";
    }
}
