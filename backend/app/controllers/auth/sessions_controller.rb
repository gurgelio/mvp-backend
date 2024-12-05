# frozen_string_literal: true

module Auth
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user, only: %i[create]

    def create
      skip_authorization

      user = User.find_by(email: create_params[:email])
      return render status: :not_found, json: { message: 'Usuário não encontrado' } if user.nil?

      if user.authenticate(create_params[:password])
        return render status: :created,
                      json: { token: JsonWebToken.encode({ id: user.id }) }
      end

      render status: :bad_request, json: { message: 'Senha incorreta' }
    end

    private

    def create_params
      params.require(:session).permit(:email, :password)
    end
  end
end
