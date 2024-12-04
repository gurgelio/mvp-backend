# frozen_string_literal: true

class UsersPolicy < ApplicationPolicy
  def create?
    true
  end

  def show?
    user.present? && (user.admin? || user.id == record.id)
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      return scope.all if user&.admin?

      scope.where(id: user.id)
    end
  end
end
