# frozen_string_literal: true

class TeacherBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :email, :phone_number
end
