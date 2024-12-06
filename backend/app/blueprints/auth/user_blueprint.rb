# frozen_string_literal: true

module Auth
  class UserBlueprint < Blueprinter::Base
    identifier :id

    fields :name, :email, :phone_number
  end
end
