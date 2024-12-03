FactoryBot.define do
  factory :admin do
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
  end
end
