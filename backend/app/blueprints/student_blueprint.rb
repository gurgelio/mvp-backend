# frozen_string_literal: true

class StudentBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :email, :phone_number

  association :teacher, blueprint: TeacherBlueprint
end
