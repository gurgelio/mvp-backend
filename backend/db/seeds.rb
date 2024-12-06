# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'faker'

Auth::User.create!(email: 'admin@admin.com', password: 'leonardo', role: :admin, phone_number: Faker::Number.within(range: 11_111_111..999_999_999_999).to_s,
                   name: 'Admin')
Auth::User.create!(email: 'usuario@usuario.com', password: 'leonardo', role: :customer, phone_number: Faker::Number.within(range: 11_111_111..999_999_999_999).to_s,
                   name: 'Usuário comum')

5.times do |_|
  Teacher.create!(name: Faker::Name.name, email: Faker::Internet.email,
                  phone_number: Faker::Number.within(range: 11_111_111..999_999_999_999).to_s)
end

10.times do |_|
  Student.create!(name: Faker::Name.name, email: Faker::Internet.email, phone_number: Faker::Number.within(range: 11_111_111..999_999_999_999).to_s,
                  teacher: Teacher.all.sample)
end

5.times do |_|
  Appointment.create!(student: Student.all.sample, time: Faker::Date.forward(days: 23))
end
