FactoryBot.define do
  factory :student do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    phone_number { Faker::Number.within(range: 11111111..999999999999).to_s }
    
    teacher
  end
end
