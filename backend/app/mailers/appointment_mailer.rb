# frozen_string_literal: true

class AppointmentMailer < ApplicationMailer
  def confirmation
    @appointment = params[:appointment]
    @user = params[:user]
    @app_url = params[:app_url]

    mail(to: @user.email,
         subject: 'Agenda Fácil NAF: Agendamento realizado')
  end

  private

  def app_url
    return 'http://localhost:3000/' unless Rails.env.production?

    'https://agendafacil.unifeso.edu.br/'
  end
end
