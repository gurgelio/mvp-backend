# frozen_string_literal: true

class AppointmentPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(user: nil).or(scope.where(user: user))
      end
    end
  end

  def create?
    user&.admin?
  end

  def index?
    true
  end

  def show?
    record.user_id.nil? || record.user_id == user&.id
  end

  def update?
    user.present? # parameters are already validated at permitted_attributes
  end

  def destroy?
    user&.admin?
  end

  def permitted_attributes
    if user.admin?
      %i[time student_id user_id]
    elsif record.user_id == user.id || record.user_id.nil?
      [:user_id]
    else
      []
    end
  end
end
