# frozen_string_literal: true

class Appointment < ApplicationRecord
  belongs_to :student
  belongs_to :user, optional: true
end
