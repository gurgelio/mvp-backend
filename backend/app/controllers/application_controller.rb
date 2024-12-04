class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Pundit::Authorization

  respond_to :json
end
