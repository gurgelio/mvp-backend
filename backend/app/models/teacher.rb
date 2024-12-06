# frozen_string_literal: true

class Teacher < ApplicationRecord
  has_many :students, inverse_of: :teacher

  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :phone_number, length: { in: 10..15 }, numericality: { only_integer: true }
end
