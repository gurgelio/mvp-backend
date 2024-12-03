class Student < ApplicationRecord
  belongs_to :teacher
  has_many :appointments, inverse_of: :student

  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number, length: 9, numericality: { only_integer: true }
end
