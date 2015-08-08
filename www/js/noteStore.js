angular.module('notes.notesStore', [])
.factory('NoteStore', [function () {
	var notes = angular.fromJson(window.localStorage['notes'] || '[]');

	function persist() {
		window.localStorage['notes'] = angular.toJson(notes);
	}

	return {
		list : function () {
			return notes;
		},
		create : function(note) {
			notes.push(note);
			persist();
		},
		save : function(note) {
			for(i=0 ; i<notes.length; i++) {
			    if (notes[i].id == note.id) {
			      notes[i] = note;
			      persist();
			      return ;
			    }
			  }
		},
		remove : function (noteId) {
			for(i=0 ; i<notes.length; i++) {
			    if (notes[i].id == noteId) {
			      notes.splice(i,1);
			      persist();
			      return ;
			    }
			  }
		},
		get : function(noteId) {
			for(i=0 ; i<notes.length; i++) {
		    if (notes[i].id == noteId) {
		      return notes[i];
		    }
		  }
		  return undefined;
		}
	};
}])