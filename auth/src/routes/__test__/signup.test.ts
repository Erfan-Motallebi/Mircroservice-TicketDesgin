import request from "supertest";
import {app} from "../../app";

test("getting a 201 status when sending off the proper requests", async () =>{
        return request(app)
            .post('/api/users/signup')
            .send({
                    email: "eZipcoder@gmail.com",
                    password: "123456"
            })
            .expect(201)
})

test()