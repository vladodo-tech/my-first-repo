import { test, expect } from "@playwright/test";

const baseUrl = "https://restful-booker.herokuapp.com";
let bookingId;
let token;

test.describe.serial("API-тесты", () => {
    //1.Создание(Create-POST)
    test("@api Create booking", async ({ request }) => {
        const response = await request.post(`${baseUrl}/booking`, {
            data: {
                firstname: "Vlad",
                lastname: "Marf",
                totalprice: 100,
                depositpaid: true,
                bookingdates: {
                    checkin: "2026-03-01",
                    checkout: "2026-03-14",
                },
                additionalneeds: "Breakfast",
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        bookingId = body.bookingid;
        expect(body.bookingid).toBeTruthy();

        expect(body.booking.firstname).toBe("Vlad");
        expect(body.booking.lastname).toBe("Marf");
        expect(body.booking.totalprice).toBe(100);
        expect(body.booking.depositpaid).toBe(true);
        expect(body.booking.additionalneeds).toBe("Breakfast");
    });
    //2.Получение информации(Read-GET)
    test("Get booking", async ({ request }) => {
        const response = await request.get(`${baseUrl}/booking/${bookingId}`);

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body.firstname).toBe("Vlad");
        expect(body.lastname).toBe("Marf");
        expect(body.totalprice).toBe(100);
        expect(body.depositpaid).toBe(true);
        expect(body.additionalneeds).toBe("Breakfast");
    });
    //3.Обновление(Update-PUT)
    test("Update booking", async ({ request }) => {
        const authResponse = await request.post(`${baseUrl}/auth`, {
            data: {
                username: "admin",
                password: "password123",
            },
        });

        const authBody = await authResponse.json();
        token = authBody.token;
        expect(token).toBeTruthy();

        const response = await request.put(`${baseUrl}/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`,
            },
            data: {
                firstname: "Artem",
                lastname: "Petrov",
                totalprice: 150,
                depositpaid: true,
                bookingdates: {
                    checkin: "2026-03-14",
                    checkout: "2026-03-28",
                },
                additionalneeds: "Lunch",
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body.firstname).toBe("Artem");
        expect(body.lastname).toBe("Petrov");
        expect(body.totalprice).toBe(150);
        expect(body.depositpaid).toBe(true);
        expect(body.additionalneeds).toBe("Lunch");
    });
    //4.Удаление(Delete-DELETE)
    test("Delete booking", async ({ request }) => {
        const response = await request.delete(`${baseUrl}/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`,
            },
        });
        expect(response.status()).toBe(201);
        //Дополнительная проверка
        const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`);
        expect(getResponse.status()).toBe(404);
    });
});