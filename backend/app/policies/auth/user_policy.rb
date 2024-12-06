# frozen_string_literal: true

module Auth
  class UserPolicy < ApplicationPolicy
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

    def permitted_attributes_for_create
      if user.admin?
        %i[name email password phone_number password_confirmation]
      elsif record.id == user.id
        %i[name email password phone_number]
      else
        []
      end
    end

    def permitted_attributes_for_update
      if user.admin?
        %i[name email password phone_number password_confirmation role]
      elsif record.id == user.id
        %i[name email password phone_number password_confirmation]
      else
        []
      end
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        return scope.all if user&.admin?

        scope.where(id: user.id)
      end
    end
  end
end
