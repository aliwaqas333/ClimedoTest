import request from "supertest";
import app from "../src/app";

describe("GET /tabs", () => {
    it("should return 200 OK", () => {
        return request(app).get("/tabStats")
            .expect(200);
    });
});

describe("GET /tabs", () => {
    it("should return 200 OK", () => {
        return request(app).get("/tabs")
            .expect(200);
    });
});

