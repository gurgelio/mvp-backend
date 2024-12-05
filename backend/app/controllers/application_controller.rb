# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ActionController::MimeResponds
  include Pundit::Authorization

  respond_to :json
  skip_before_action :verify_authenticity_token
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  before_action :authenticate_user, unless: :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :verify_authorized, unless: :devise_controller?

  private

  def user_not_authorized
    render status: :forbidden, json: { message: 'You are not authorized to perform this action.' }
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name phone_number])
  end
end
