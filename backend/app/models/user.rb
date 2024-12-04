# frozen_string_literal: true

class User < ApplicationRecord
  primary_abstract_class

  def admin?
    instance_of? Admin
  end

  def customer?
    instance_of? Customer
  end
end
