# frozen_string_literal: true

module Auth
  class RegistrationsController < ApplicationController
    before_action :set_user, only: %i[update destroy show]
    skip_before_action :authenticate_user, only: %i[create]

    def create
      user = User.create!(permitted_attributes)
      render status: :created, json: { user: user, token: JsonWebToken.encode({ id: user.id }) }
    end

    def update
      authorize @user
      @user.update!(permitted_attributes)
    end

    def destroy
      authorize @user
      @user.destroy!
    end

    private

    def set_user
      @user = User.find_by(params[:id])
    end
  end
end
