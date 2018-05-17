#!/Python27/python
import cgi, cgitb 
cgitb.enable()  # for troubleshooting

#the cgi library gets vars from html
data = cgi.FieldStorage()
#this is the actual output
print "Content-Type: text/html\n"
print "The name data is: " + data["name"].value
print "<br />"
print "The email data is: " + data["email"].value
print "<br />"
print "The course data is: " + data["course"].value
print "<br />"
print "The comment data is: " + data["comment"].value
print "<br />"
print data