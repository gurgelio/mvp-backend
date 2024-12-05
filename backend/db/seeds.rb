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

User.create!(email: 'leo@gurgel.io', password: 'leonardo', role: :admin, phone_number: '1111111111',
             name: 'Leonardo Gurgel')
elon = Teacher.create!(name: 'Elon Musk', email: 'elon@tesla.lixo', phone_number: '33333333333')
Student.create!(name: 'Neymar da Silva Santos Jr.', email: 'neymar@alhilal.com', phone_number: '2222222222',
                teacher: elon)

Student.create!(name: 'Bryan Cranston', email: 'bryan@breakingbad.com', phone_number: '4444444444', teacher: elon)

teacher2 = Teacher.create!(name: 'Hillary Clinton', email: 'perdieleicao@protrump.com', phone_number: '5555555555')
Student.create!(name: 'Joe Biden', email: 'joe@joe.joe', phone_number: '6666666666', teacher: teacher2)
