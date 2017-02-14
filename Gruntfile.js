'use strict';

module.exports = function(grunt){
	
	//配置
	var config = {
		src : 'src',
		dist : 'dist'
	};
	
	//载入task
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-usemin');
	
	grunt.initConfig({
		
		config : config,
		
		//清除dist目录
		clean : {
			
			src : '<%= config.dist %>/'
			
		},
		
		//准备替换引用
		useminPrepare: {

			html: '<%= config.src %>/index.html',
			
			options: {
				
				dest: '<%= config.dist %>'
			
			}
		},
		
		//md5重写文件名
		filerev: {
			
		    options: {
		    	
		      algorithm: 'md5',
		      
		      length: 8
		      
		    },
		    
		    //排除index.html和一些动态资源
		    files: {
		      src: ['<%= config.dist %>/**/*.{css,js,jpg,png,jpeg,gif,mp4}', 
		      '!<%= config.dist %>/index.html',
		      '!<%= config.dist %>/img/main_nav/logo.png',
		      '!<%= config.dist %>/img/content/main/section_6/**/*',
		      '!<%= config.dist %>/img/content/main/section_3/**/*',
		      '!<%= config.dist %>/img/content/main/section_4/**/*']
		    }
		  },
		
		//拷贝
		copy:{
			
			build: {
				
				expand:true,
				cwd:'<%= config.src %>/',
				src:['index.html', 'img/**/*', 'tpl/**/*', 'video/**/*'],
				dest:'<%= config.dist %>'
				
			}
			
		},
		
		//替换成新的引用
		usemin : {
			
			
			html : '<%= config.dist %>/index.html',
			css : '<%= config.dist %>/css/*.css',
			
		},
		
		//less 编译task
		less: {
			
			compile:{
				
				files:{
					
					"<%= config.src %>/css/main.css": "<%= config.src %>/css/main.less"
					
				}
				
				
			}
			
		},
		
		//监听less变化,若有变化则执行less task
		watch: {
			
			scripts: {
				
				files: ["<%= config.src %>/css/*.less"],
				tasks:['less']
				
			}
			
		}


	});
	
	//编译less task
	grunt.registerTask('compile', ['less', 'watch']);
	
	//默认组合 task
	grunt.registerTask('default',[
			
		  'clean',
		  
		  'copy',
			
		  'useminPrepare',
		  
		  'concat',
	
		  'uglify',
		  
		  'cssmin',
		  
		  'filerev',

		  'usemin'
	
	 ]);
	
}
