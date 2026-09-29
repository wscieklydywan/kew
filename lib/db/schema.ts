import { integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  partnerName: text('partner_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const siteContent = pgTable('site_content', {
  id: integer('id').primaryKey(),
  data: jsonb('data').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
