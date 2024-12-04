# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Pundit::Authorization

  respond_to :json
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  before_action :authenticate_user
  after_action :verify_authorized

  private

  def user_not_authorized
    render status: :forbidden, json: { message: 'You are not authorized to perform this action.' }
  end
end
