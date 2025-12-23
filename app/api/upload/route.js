import React from 'react'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.MAIL_KEY,
    api_secret: process.env.MAIL_SECRET
});

export async function POST(req) {
    try {
        cloudinary.uploader
            .upload("https://imgs.search.brave.com/V6qLjB3fqMU_4WUuUDwKoH2OIhnvkD7DwDNdD2iO2Uo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/ODA3NDIxNi9waG90/by9wb3J0cmFpdC1v/Zi1mZW1hbGUtYXJj/aGl0ZWN0LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz02SW45/VkFiakExNmlicHRh/Um5GSzVzTF9SQ2tU/dUdlbG9qSVhLZi11/ZWpzPQ")
            .then(result => console.log(result));
    } catch (error) {
        console.log(error)
    }
}
