const I="data:text/markdown;base64,IyBQaOG7nyBUw6FpIChCZWVmIFBobyB3aXRoIFJhcmUgRmlsZXQgTWlnbm9uKQ0KDQojIyBEZXNjcmlwdGlvbjoNClBo4bufIHTDoWkgaXMgYSBjbGFzc2ljIFZpZXRuYW1lc2Ugc291cCBrbm93biBmb3IgaXRzIGZyYWdyYW50IGJyb3RoLCB0ZW5kZXIgcmljZSBub29kbGVzLCBhbmQgdGhpbmx5IHNsaWNlZCByYXJlIGZpbGV0IG1pZ25vbi4gVGhpcyBkaXNoIGlzIGNvbXBsZW1lbnRlZCBieSBmcmVzaCBhcm9tYXRpYyBoZXJicywgbGltZSwgYW5kIGEgd2VsbC1iYWxhbmNlZCBjb25kaW1lbnQgYXNzZW1ibHkuIEl0cyByaWNoIGFuZCBhcm9tYXRpYyBmbGF2b3JzIHBhaXIgZXhxdWlzaXRlbHkgd2l0aCBhIFBpbm90IE5vaXIsIHN1Y2ggYXMgdGhlIERvbWFpbmUgRHJvdWhpbiBPcmVnb24gMjAxOC4NCg0KLS0tDQoNCiMjIEluZ3JlZGllbnRzOg0KDQojIyMgQnJvdGgNCi0gMSBsYXJnZSB5ZWxsb3cgb25pb24sIGhhbHZlZA0KLSA0LWluY2ggcGllY2Ugb2YgZ2luZ2VyLCBzbGljZWQgbGVuZ3Rod2lzZQ0KLSA0IGxicyBiZWVmIGtudWNrbGUgYm9uZXMgKG1hcnJvdyBib25lcykNCi0gMSBsYiBveHRhaWwNCi0gMSBsYiBiZWVmIGJyaXNrZXQNCi0gMy1pbmNoIGNodW5rIG9mIGRhaWtvbiByYWRpc2gsIHBlZWxlZA0KLSA1IHN0YXIgYW5pc2UNCi0gNCBjbG92ZXMNCi0gMiBjaW5uYW1vbiBzdGlja3MNCi0gMSB0YnNwIGNvcmlhbmRlciBzZWVkcw0KLSA0IHRic3AgZmlzaCBzYXVjZQ0KLSAyIHRic3Agcm9jayBzdWdhcg0KLSBTYWx0IHRvIHRhc3RlDQoNCiMjIyBOb29kbGVzIGFuZCBCZWVmDQotIDEgbGIgZmxhdCByaWNlIG5vb2RsZXMgKGLDoW5oIHBo4bufKQ0KLSA4IG96IGZpbGV0IG1pZ25vbiwgdGhpbmx5IHNsaWNlZA0KDQojIyMgR2FybmlzaGVzDQotIDEgYnVuY2ggb2YgVGhhaSBiYXNpbA0KLSAxIGJ1bmNoIG9mIGNpbGFudHJvDQotIDEgYnVuY2ggb2YgbWludA0KLSAxIHNtYWxsIHJlZCBvbmlvbiwgdGhpbmx5IHNsaWNlZA0KLSBCZWFuIHNwcm91dHMNCi0gMi0zIGZyZXNoIGxpbWVzLCBxdWFydGVyZWQNCi0gMS0yIGphbGFwZcOxbyBwZXBwZXJzLCB0aGlubHkgc2xpY2VkDQotIEhvaXNpbiBzYXVjZQ0KLSBTcmlyYWNoYSBzYXVjZQ0KDQotLS0NCg0KIyMgUHJlcGFyYXRpb24gSW5zdHJ1Y3Rpb25zOg0KDQojIyMgUHJlcGFyaW5nIHRoZSBCcm90aDoNCjEuICoqQ2hhciB0aGUgQXJvbWF0aWNzOioqIFBsYWNlIHRoZSBvbmlvbiBhbmQgZ2luZ2VyIHVuZGVyIGEgcHJlaGVhdGVkIGJyb2lsZXIgdW50aWwgdGhleSBkZXZlbG9wIGEgc2xpZ2h0IGNoYXIgKGFib3V0IDUtMTAgbWludXRlcykuIFNldCBhc2lkZS4NCg0KMi4gKipCbGFuY2ggdGhlIEJvbmVzIGFuZCBNZWF0czoqKiBJbiBhIGxhcmdlIHBvdCwgYnJpbmcgd2F0ZXIgdG8gYSBib2lsLCBhbmQgYmxhbmNoIHRoZSBiZWVmIGJvbmVzLCBveHRhaWwsIGFuZCBicmlza2V0IGZvciAxMCBtaW51dGVzIHRvIHJlbW92ZSBpbXB1cml0aWVzLiBEcmFpbiBhbmQgcmluc2UgdGhlIGJvbmVzIGFuZCBtZWF0IHVuZGVyIGNvbGQgd2F0ZXIuDQoNCjMuICoqU2ltbWVyOioqIEZpbGwgYSBjbGVhbiBwb3Qgd2l0aCA2IHF1YXJ0cyBvZiB3YXRlci4gQWRkIHRoZSBibGFuY2hlZCBib25lcywgb25pb24sIGdpbmdlciwgZGFpa29uLCBzdGFyIGFuaXNlLCBjbG92ZXMsIGNpbm5hbW9uIHN0aWNrcywgYW5kIGNvcmlhbmRlciBzZWVkcy4NCg0KNC4gKipGbGF2b3Jpbmc6KiogQWRkIHRoZSBmaXNoIHNhdWNlLCByb2NrIHN1Z2FyLCBhbmQgc2FsdC4gQnJpbmcgdG8gYSBib2lsLCB0aGVuIHJlZHVjZSB0byBhIGdlbnRsZSBzaW1tZXIuDQoNCjUuICoqQ29va2luZyBUaW1lOioqIFNpbW1lciB1bmNvdmVyZWQgZm9yIGF0IGxlYXN0IDMgaG91cnMsIHNraW1taW5nIG9mZiBhbnkgZm9hbXkgc2N1bSBvciBleGNlc3MgZmF0LiBUYXN0ZSB0aGUgYnJvdGggYW5kIGFkZCBtb3JlIHNhbHQgb3IgZmlzaCBzYXVjZSB0byB5b3VyIHByZWZlcmVuY2UuDQoNCjYuICoqU3RyYWluOioqIE9uY2UgdGhlIGJyb3RoIGlzIHJpY2ggYW5kIGFyb21hdGljLCBzdHJhaW4gaXQgdGhyb3VnaCBhIGZpbmUgbWVzaCBzaWV2ZS4gRGlzY2FyZCBzb2xpZHMsIGFuZCBrZWVwIHRoZSBjb29rZWQgYnJpc2tldCBhc2lkZS4gTGV0IGNvb2wsIHRoZW4gcmVmcmlnZXJhdGUgaWYgbm90IHVzaW5nIGltbWVkaWF0ZWx5IChza2ltIHRoZSBzb2xpZGlmaWVkIGZhdCBmcm9tIHRoZSBzdXJmYWNlIGJlZm9yZSB1c2UpLg0KDQojIyMgUHJlcGFyaW5nIHRoZSBOb29kbGVzIGFuZCBNZWF0Og0KMS4gKipOb29kbGVzOioqIFNvYWsgdGhlIHJpY2Ugbm9vZGxlcyBpbiB3YXJtIHdhdGVyIGZvciAzMCBtaW51dGVzLCB0aGVuIGRyYWluLiBDb29rIGluIGJvaWxpbmcgd2F0ZXIgZm9yIGEgY291cGxlIG9mIG1pbnV0ZXMgdW50aWwgdGVuZGVyLCB0aGVuIHJpbnNlIHVuZGVyIGNvbGQgd2F0ZXIuIERpdmlkZSBhbW9uZyBzZXJ2aW5nIGJvd2xzLg0KDQoyLiAqKkJlZWY6KiogQXJyYW5nZSByYXcgZmlsZXQgbWlnbm9uIHNsaWNlcyBhdG9wIHRoZSBjb29rZWQgbm9vZGxlcy4gQWRkIHNsaWNlcyBvZiB0aGUgY29va2VkIGJyaXNrZXQgaWYgZGVzaXJlZC4NCg0KIyMjIEJyaW5naW5nIGl0IFRvZ2V0aGVyOg0KMS4gKipIZWF0IGFuZCBTZXJ2ZToqKiBSZWhlYXQgdGhlIGJyb3RoLCBicmluZ2luZyBpdCBiYWNrIHRvIGEgcmFwaWQgYm9pbC4gTGFkbGUgdGhlIGJyb3RoIG92ZXIgdGhlIGJlZWYgYW5kIG5vb2RsZXMgaW4gZWFjaCBib3dsLCB3aGljaCB3aWxsIGNvb2sgdGhlIHRoaW5seSBzbGljZWQgZmlsZXQgbWlnbm9uLg0KDQoyLiAqKkdhcm5pc2hlczoqKiBTZXJ2ZSB3aXRoIGdlbmVyb3VzIGFtb3VudHMgb2YgaGVyYnMsIHNsaWNlZCBvbmlvbnMsIGJlYW4gc3Byb3V0cywgbGltZSB3ZWRnZXMsIGphbGFwZcOxbyBzbGljZXMsIGhvaXNpbiwgYW5kIFNyaXJhY2hhLg0KDQojIyMgVGFzdGluZyBOb3RlczoNClRoZSBicm90aCBzaG91bGQgaGF2ZSBhIGRlZXAsIHNhdm9yeSByaWNobmVzcyB3aXRoIGEgc2xpZ2h0IGhpbnQgb2Ygc3dlZXRuZXNzIGFuZCBhIGJhbGFuY2Ugb2Ygc3BpY2VzLiBFbmNvdXJhZ2UgZGluZXJzIHRvIGN1c3RvbWl6ZSB0aGVpciBib3dscyB3aXRoIGxpbWUsIGhlcmJzLCBhbmQgY29uZGltZW50cyB0byBhY2hpZXZlIHRoZWlyIHByZWZlcnJlZCBmbGF2b3IgYmFsYW5jZS4NCg0KKipXaW5lIFBhaXJpbmcgU3VnZ2VzdGlvbjoqKg0KUGlub3QgTm9pciBEb21haW5lIERyb3VoaW4gT3JlZ29uIDIwMTgsIHdpdGggaXRzIHNpbGt5IHRhbm5pbnMgYW5kIHZpYnJhbnQgYWNpZGl0eSwgd2lsbCBtYXRjaCBiZWF1dGlmdWxseSB3aXRoIHRoZSBmbGF2b3JzIGFuZCB0ZXh0dXJlcyBvZiBwaOG7nyB0w6FpLCBlbmhhbmNpbmcgdGhlIGFyb21hdGljIGV4cGVyaWVuY2Ugd2l0aCBlYWNoIHNpcC4=";export{I as default};
