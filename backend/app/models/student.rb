# frozen_string_literal: true

class Student < ApplicationRecord
  belongs_to :teacher
  has_many :appointments, inverse_of: :student

  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :phone_number, length: { in: 8..12 }, numericality: { only_integer: true }
end
