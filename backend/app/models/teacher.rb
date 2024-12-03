class Teacher < ApplicationRecord
  has_many :students, inverse_of: :teacher

  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone_number, length: 9, numericality: { only_integer: true }
end
