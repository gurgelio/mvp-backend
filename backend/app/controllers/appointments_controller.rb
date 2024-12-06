# frozen_string_literal: true

class AppointmentsController < ApplicationController
  before_action :set_appointment, only: %i[show update destroy make cancel]

  def index
    authorize Appointment
    @appointments = policy_scope(Appointment)

    @appointments.where(user_id: params[:user_id]) if params[:user_id].present?

    render json: AppointmentBlueprint.render(@appointments.all)
  end

  def show
    authorize @appointment
    render json: AppointmentBlueprint.render(@appointment)
  end

  def create
    authorize Appointment

    @appointment = Appointment.new(permitted_attributes(@appointment))

    if @appointment.save
      render json: AppointmentBlueprint.render(@appointment), status: :created, location: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @appointment

    if @appointment.update(appointment_params)
      render json: AppointmentBlueprint.render(@appointment)
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def make
    authorize @appointment

    if @appointment.update(user_id: current_user.id)
      render json: AppointmentBlueprint.render(@appointment)
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def cancel
    authorize @appointment

    if @appointment.update(user_id: nil)
      render json: AppointmentBlueprint.render(@appointment)
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @appointment
    @appointment.destroy!
  end

  private

  def appointment_params
    params.require(:appointment).permit(:time, :student_id, :user_id)
  end

  def set_appointment
    @appointment = policy_scope(Appointment).find(params[:id])
  end
end
