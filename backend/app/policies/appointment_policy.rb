# frozen_string_literal: true

class AppointmentPolicy
  attr_reader :user, :post

  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(user: nil).or(scope.where(user: user))
      end
    end
  end

  def initialize(user, appointment)
    @user = user
    @appointment = appointment
  end

  def create?
    user.admin?
  end

  def index?
    true
  end

  def show?
    true
  end

  def update?
    user.admin?
  end

  def destroy?
    user.admin?
  end
end
