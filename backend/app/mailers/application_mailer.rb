# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'agendafacil@unifeso.edu.br'
  layout 'mailer'
end
