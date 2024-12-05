# frozen_string_literal: true

class AppointmentsController < ApplicationController
  before_action :set_appointment, only: %i[show update destroy]

  # GET /appointments
  def index
    @appointments = policy_scope(Appointment).all

    render json: @appointments
  end

  # GET /appointments/1
  def show
    authorize @appointment
    render json: @appointment
  end

  # POST /appointments
  def create
    authorize Appointment

    @appointment = Appointment.new(permitted_attributes)

    if @appointment.save
      render json: @appointment, status: :created, location: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /appointments/1
  def update
    authorize @appointment

    if @appointment.update(permitted_attributes)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /appointments/1
  def destroy
    authorize @appointment
    @appointment.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_appointment
    @appointment = policy_scope(Appointment).find(params[:id])
  end
end
