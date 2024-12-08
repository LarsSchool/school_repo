#include "staticPage.h"
#include "Patient.h"

String makePatient(String patient[]) {

  return "<table>"
         "<tr><th>Patient</th>"
         "<th>"
         + patient[0] + "</th></tr>"
                        "<tr><td>Ecg</td><td>"
         + patient[1] + "</td></tr>"
                        "<tr><td>Hemaglobine</td><td>"
         + patient[2] + "</td></tr>"
                        "<tr><td>Bovendruk</td><td>"
         + patient[3] + "</td></tr>"
                        "<tr><td>Onderdruk</td><td>"
         + patient[4] + "</td></tr>"
                        "<tr><td>Cholesterol</td><td>"
         + patient[5] + "</td></tr>"
                        "<tr><td>Zuurstofgehalte</td><td>"
         + patient[6] + "</td></tr>"
                        "<tr><td>Hartslag</td><td>"
         + patient[7] + "</td></tr>"
                        "</table>"
                        "<br>";
}

String makePage(String patient[PATIENT_COUNT][MEASURMENT_COUNT]) {
  String page = "<!DOCTYPE html>"
                "<html lang=\"en\">"
                "<head>"
                "<meta charset=\"UTF-8\" />"
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />"
                "<meta http-equiv=\"refresh\" content=\"10\" />"
                "<title>Overzicht Patienten</title>"
                "<script>"
                "//bron: https://www.geeksforgeeks.org/how-to-automatic-refresh-a-web-page-in-fixed-time/"
                "function autoRefresh() {"
                "window.location = window.location.href;"
                "}"
                "setInterval('autoRefresh()', 2000);"
                "</script>"
                "</head>"
                "<body>";

  for (uint8_t patient_number = 0; patient_number < PATIENT_COUNT; patient_number++) {
    page += makePatient(patient[patient_number]);
  }
  page += "</body>"
          "</html>";

  return page;
}
