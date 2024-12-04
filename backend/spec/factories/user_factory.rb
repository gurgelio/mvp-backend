# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
    role { :customer }

    trait :admin do
      role { :admin }
    end
  end
end
