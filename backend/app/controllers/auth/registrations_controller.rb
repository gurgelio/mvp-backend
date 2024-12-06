# frozen_string_literal: true

module Auth
  class RegistrationsController < ApplicationController
    before_action :set_user, only: %i[update destroy]
    skip_before_action :authenticate_user, only: %i[create]

    def index
      authorize User

      users = policy_scope(User).all
      render json: UserBlueprint.render(users)
    end

    def create
      skip_authorization

      user = User.create!(create_params)
      render status: :created,
             json: { user: UserBlueprint.render(user), token: JsonWebToken.encode({ id: user.id }) }
    end

    def update
      authorize @user
      @user.update!(update_params)
    end

    def destroy
      authorize @user
      @user.destroy!
    end

    private

    def set_user
      @user = User.find_by(params[:id])
    end

    def create_params
      params.require(:registration).permit(:name, :email, :password, :phone_number, :password_confirmation)
    end

    def update_params
      if user.admin?
        params.require(:registration).permit(:name, :email, :password, :phone_number, :password_confirmation, :role)
      else
        params.require(:registration).permit(:name, :email, :password, :phone_number, :password_confirmation)
      end
    end
  end
end
