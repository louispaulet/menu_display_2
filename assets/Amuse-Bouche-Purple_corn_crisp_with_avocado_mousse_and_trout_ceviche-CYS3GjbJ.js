const I="data:text/markdown;base64,IyMjIFB1cnBsZSBDb3JuIENyaXNwIHdpdGggQXZvY2FkbyBNb3Vzc2UgYW5kIFRyb3V0IENldmljaGUNCg0KIyMjIyBJbmdyZWRpZW50cw0KDQoqKkZvciB0aGUgUHVycGxlIENvcm4gQ3Jpc3A6KioNCi0gMSBjdXAgcHVycGxlIGNvcm5tZWFsDQotIDEvMiBjdXAgYWxsLXB1cnBvc2UgZmxvdXINCi0gMSB0YWJsZXNwb29uIG9saXZlIG9pbA0KLSAxLzIgdGVhc3Bvb24gc2FsdA0KLSAxLzIgY3VwIHdhdGVyDQotIFZlZ2V0YWJsZSBvaWwgZm9yIGZyeWluZw0KDQoqKkZvciB0aGUgQXZvY2FkbyBNb3Vzc2U6KioNCi0gMiByaXBlIGF2b2NhZG9zLCBwZWVsZWQsIHBpdHRlZCwgYW5kIGRpY2VkDQotIDEgdGFibGVzcG9vbiBsaW1lIGp1aWNlDQotIDEvNCBjdXAgaGVhdnkgY3JlYW0NCi0gU2FsdCBhbmQgcGVwcGVyIHRvIHRhc3RlDQoNCioqRm9yIHRoZSBUcm91dCBDZXZpY2hlOioqDQotIDEvMiBwb3VuZCBmcmVzaCB0cm91dCBmaWxsZXQsIHNraW4gcmVtb3ZlZCwgZmluZWx5IGRpY2VkDQotIDEvNCBjdXAgbGVtb24ganVpY2UNCi0gMS80IGN1cCBsaW1lIGp1aWNlDQotIDEgc21hbGwgcmVkIG9uaW9uLCBmaW5lbHkgY2hvcHBlZA0KLSAxLzIgY3VwIGNoZXJyeSB0b21hdG9lcywgZGljZWQNCi0gMSB0YWJsZXNwb29uIGZyZXNoIGNpbGFudHJvLCBjaG9wcGVkDQotIFNhbHQgYW5kIHBlcHBlciB0byB0YXN0ZQ0KDQojIyMjIEluc3RydWN0aW9ucw0KDQoqKjEuIFByZXBhcmUgdGhlIFB1cnBsZSBDb3JuIENyaXNwOioqDQogICAtIEluIGEgYm93bCwgY29tYmluZSB0aGUgcHVycGxlIGNvcm5tZWFsLCBhbGwtcHVycG9zZSBmbG91ciwgb2xpdmUgb2lsLCBhbmQgc2FsdC4NCiAgIC0gQWRkIHdhdGVyIGdyYWR1YWxseSwgbWl4aW5nIHVudGlsIGEgZG91Z2ggZm9ybXMuDQogICAtIFJvbGwgb3V0IHRoZSBkb3VnaCB0aGlubHkgb24gYSBmbG91cmVkIHN1cmZhY2UgYW5kIGN1dCBpbnRvIGRlc2lyZWQgc2hhcGVzLg0KICAgLSBIZWF0IHZlZ2V0YWJsZSBvaWwgaW4gYSBza2lsbGV0IG92ZXIgbWVkaXVtIGhlYXQuDQogICAtIEZyeSB0aGUgcGllY2VzIHVudGlsIGNyaXNwIGFuZCBnb2xkZW4gYnJvd24uIERyYWluIG9uIHBhcGVyIHRvd2VscyBhbmQgc2V0IGFzaWRlLg0KDQoqKjIuIE1ha2UgdGhlIEF2b2NhZG8gTW91c3NlOioqDQogICAtIEluIGEgYmxlbmRlciwgY29tYmluZSB0aGUgYXZvY2FkbywgbGltZSBqdWljZSwgYW5kIGhlYXZ5IGNyZWFtLg0KICAgLSBCbGVuZCB1bnRpbCBzbW9vdGggYW5kIGNyZWFteS4NCiAgIC0gU2Vhc29uIHdpdGggc2FsdCBhbmQgcGVwcGVyIHRvIHRhc3RlLiBUcmFuc2ZlciB0byBhIHBpcGluZyBiYWcgYW5kIGNoaWxsIHVudGlsIG5lZWRlZC4NCg0KKiozLiBQcmVwYXJlIHRoZSBUcm91dCBDZXZpY2hlOioqDQogICAtIEluIGEgYm93bCwgY29tYmluZSB0aGUgdHJvdXQgZmlsbGV0IHdpdGggbGVtb24ganVpY2UsIGxpbWUganVpY2UsIGFuZCBhIHBpbmNoIG9mIHNhbHQuDQogICAtIExldCBpdCBzaXQgaW4gdGhlIHJlZnJpZ2VyYXRvciBmb3IgYXQgbGVhc3QgMTUtMjAgbWludXRlcyB0byAiY29vayIgdGhlIHRyb3V0Lg0KICAgLSBBZGQgdGhlIHJlZCBvbmlvbiwgY2hlcnJ5IHRvbWF0b2VzLCBhbmQgY2lsYW50cm8gdG8gdGhlIHRyb3V0IGFuZCBtaXggd2VsbC4NCiAgIC0gU2Vhc29uIHdpdGggc2FsdCBhbmQgcGVwcGVyIHRvIHRhc3RlLg0KDQoqKjQuIEFzc2VtYmx5OioqDQogICAtIFBpcGUgYSBzbWFsbCBhbW91bnQgb2YgYXZvY2FkbyBtb3Vzc2Ugb250byBlYWNoIGNyaXNwLg0KICAgLSBUb3Agd2l0aCBhIHNwb29uZnVsIG9mIHRyb3V0IGNldmljaGUuDQogICAtIEdhcm5pc2ggd2l0aCBhZGRpdGlvbmFsIGNpbGFudHJvLCBpZiBkZXNpcmVkLg0KDQojIyMjIFdpbmUgUGFpcmluZw0KLSBQYWlyIHdpdGggYSBWZXJhbW9udGUgU2F1dmlnbm9uIEJsYW5jIDIwMjAgdG8gY29tcGxlbWVudCB0aGUgY2l0cnVzIG5vdGVzIGFuZCBlbmhhbmNlIHRoZSBmcmVzaG5lc3Mgb2YgdGhlIGRpc2gu";export{I as default};
