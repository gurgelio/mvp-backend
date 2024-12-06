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

  def my?
    true
  end

  def index?
    true
  end

  def show?
    record.user_id.nil? || record.user_id == user&.id
  end

  def update?
    user&.admin?
  end

  def make?
    user.present?
  end

  def cancel?
    user.present? && (user.admin? || user.id == record&.user_id)
  end

  def destroy?
    user&.admin?
  end
end
