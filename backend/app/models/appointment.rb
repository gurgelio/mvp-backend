class Appointment < ApplicationRecord
  belongs_to :student
  belongs_to :customer, optional: true
end
