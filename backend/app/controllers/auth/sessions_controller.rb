# frozen_string_literal: true

module Auth
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user, only: %i[create]
    before_action :skip_authorization

    def me
      if current_user.nil?
        render status: :unauthorized
        return
      end

      render json: UserBlueprint.render(current_user)
    end

    def create
      user = User.find_by(email: create_params[:email])
      if user.nil?
        render status: :not_found, json: { message: 'Usuário não encontrado' }
        return
      end

      if user.authenticate(create_params[:password])
        render status: :created, json: { token: JsonWebToken.encode({ id: user.id }) }
        return
      end

      render status: :bad_request, json: { message: 'Senha incorreta' }
    end

    private

    def create_params
      params.require(:session).permit(:email, :password)
    end
  end
end
