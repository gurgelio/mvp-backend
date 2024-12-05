# frozen_string_literal: true

class StudentPolicy < ApplicationPolicy
  def create?
    user&.admin?
  end

  def index?
    true
  end

  def show?
    true
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      scope.all
    end
  end
end
