# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Pundit::Authorization

  attr_reader :current_user

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  before_action :authenticate_user
  after_action :verify_authorized

  private

  def user_not_authorized
    render status: :forbidden, json: { message: 'You are not authorized to perform this action.' }
  end

  def authenticate_user
    @decoded = JsonWebToken.decode(request.headers[:Authorization])
    @current_user = Auth::User.find(@decoded[:id])
  rescue ActiveRecord::RecordNotFound => e
    render status: :unauthorized, json: { errors: e.message }
  rescue ::JWT::DecodeError => e
    render status: :unauthorized, json: { errors: e.message }
  end
end
