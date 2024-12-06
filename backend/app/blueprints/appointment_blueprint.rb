# frozen_string_literal: true

class AppointmentBlueprint < Blueprinter::Base
  identifier :id

  fields :time

  association :user, blueprint: UserBlueprint
  association :student, blueprint: StudentBlueprint
end
