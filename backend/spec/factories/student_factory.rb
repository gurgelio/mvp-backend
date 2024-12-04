# frozen_string_literal: true

FactoryBot.define do
  factory :student do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    phone_number { Faker::Number.within(range: 11_111_111..999_999_999_999).to_s }

    teacher
  end
end
