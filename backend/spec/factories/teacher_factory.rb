FactoryBot.define do
  factory :teacher do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    phone_number { Faker::Number.within(range: 11111111..999999999999).to_s }
  end
end
