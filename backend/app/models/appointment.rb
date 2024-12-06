# frozen_string_literal: true

class Appointment < ApplicationRecord
  belongs_to :student
  belongs_to :user, optional: true, class_name: 'Auth::User'
end
