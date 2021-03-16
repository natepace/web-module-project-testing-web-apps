import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
/*YOU REDOING ALL DIS*/
test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', async ()=> {
    render(<ContactForm/>)

    const header = await screen.findByText(/Contact Form/i)

    expect(header).toBeVisible

    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")

    userEvent.type(firstName, "Edd")
    userEvent.type(lastName, "Burke")
    userEvent.type(email, "bluebill1049@hotmail.com")

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")

    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(3)
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "natey")
    userEvent.type(lastName, "watey")
    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "natey")
    userEvent.type(lastName, "watey")
    userEvent.type(email, "NO")
    userEvent.click(button)

    const emailError = await screen.findByText(/email must be a valid email address/i)

    expect(emailError).toBeInTheDocument
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "natey")
    userEvent.type(email, "yippeekaiyaymf@christmas.com")
    userEvent.click(button)

    const lastNameError = await screen.findByText(/lastName is a required field/i)

    expect(lastNameError).toBeInTheDocument
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "natey")
    userEvent.type(lastName, "watey")
    userEvent.type(email, "yippeekaiyaymf@christmas.com")
    userEvent.click(button)

    const submittedFirst = await screen.findByText(/natey/i)
    const submittedLast = await screen.findByText(/watey/i)
    const submittedEmail = await screen.findByText(/yippeekaiyaymf@christmas.com/i)

    expect(submittedFirst).toBeVisible
    expect(submittedLast).toBeVisible
    expect(submittedEmail).toBeVisible
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText("First Name*")
    const lastName = screen.getByLabelText("Last Name*")
    const email = screen.getByLabelText("Email*")
    const message = screen.getByLabelText("Message")
    const button = screen.getByRole("button")

    userEvent.type(firstName, "natey")
    userEvent.type(lastName, "watey")
    userEvent.type(email, "yippeekaiyaymf@christmas.com")
    userEvent.type(message, "NO")
    userEvent.click(button)

    const submittedFirst = await screen.findByText(/natey/i)
    const submittedLast = await screen.findByText(/watey/i)
    const submittedEmail = await screen.findByText(/yippeekaiyaymf@christmas.com/i)
    const submittedMessage = await screen.findByDisplayValue("NO")

    expect(submittedFirst).toBeVisible
    expect(submittedLast).toBeVisible
    expect(submittedEmail).toBeVisible
    expect(submittedMessage).toBeVisible
});