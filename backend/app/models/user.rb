# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  enum :role, { customer: 0, admin: 1 }
  has_many :appointments, inverse_of: :user

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true, presence: true
  validates :phone_number, presence: true, numericality: true, length: { minimum: 10, maximum: 15 }
  validates :name, presence: true, length: { minimum: 1 }
end
