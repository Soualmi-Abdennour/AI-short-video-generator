import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users=pgTable('users',{
    id:serial("id").primaryKey(),
    name:varchar("name"),
    email:varchar("email").notNull(),
    imageUrl:varchar("imageURL"),
    subsicription:boolean("subsicription").default(false),
    // credits:integer('credits').default(30)
})
export const videos=pgTable('videos',{
    id:serial("id").primaryKey(),
    videoScript:json("videoScript").notNull(),
    audioUrl:varchar("audioUrl").notNull(),
    captionWords:json("captionWords").notNull(),
    imagesUrls:varchar("ImagesUrls").array(),
    createdBy:varchar("createdBy").notNull()
})