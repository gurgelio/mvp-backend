# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  enum :role, { customer: 0, admin: 1 }
  has_many :appointments, inverse_of: :customer

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
end
